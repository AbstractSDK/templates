use abstract_app::objects::namespace::Namespace;

use abstract_client::{AbstractClient, AbstractInterchainClient, Application, RemoteAccount};

use abstract_app::std::objects::TruncatedChainId;

use cw_orch::{anyhow, prelude::*};
use cw_orch_interchain::prelude::*;

use ping_pong::msg::{PingPongInstantiateMsg, StatusResponse};
use ping_pong::PING_PONG_ID;
use ping_pong::{PingPongExecuteMsgFns, PingPongInterface, PingPongQueryMsgFns};

const JUNO: &str = "juno-1";
const STARGAZE: &str = "stargaze-1";

#[allow(unused)]
struct PingPong<Env: IbcQueryHandler, IbcEnv: InterchainEnv<Env>> {
    abs_juno: AbstractClient<Env>,
    abs_stargaze: AbstractClient<Env>,
    ping_pong: Application<Env, PingPongInterface<Env>>,
    remote_account: RemoteAccount<Env, IbcEnv>,
    mock_interchain: IbcEnv,
}

impl PingPong<MockBech32, MockBech32InterchainEnv> {
    /// Set up the test environment with two Accounts that has the App installed
    fn setup() -> anyhow::Result<PingPong<MockBech32, MockBech32InterchainEnv>> {
        // Logger
        let _ = env_logger::builder().is_test(true).try_init();

        // Create a sender and mock env
        let mock_interchain =
            MockBech32InterchainEnv::new(vec![(JUNO, "juno"), (STARGAZE, "stargaze")]);

        let interchain_abstract = AbstractInterchainClient::deploy_mock(&mock_interchain)?;

        let abs_juno = interchain_abstract.client(JUNO)?;
        let abs_stargaze = interchain_abstract.client(STARGAZE)?;

        let namespace = Namespace::from_id(PING_PONG_ID)?;
        // Publish and install on both chains
        let publisher_juno = abs_juno
            .account_builder()
            .namespace(namespace.clone())
            .build()?
            .publisher()?;
        publisher_juno.publish_app::<PingPongInterface<_>>()?;
        let app = publisher_juno
            .account()
            .install_app_with_dependencies::<PingPongInterface<_>>(
                &PingPongInstantiateMsg {},
                Empty {},
                &[],
            )?;

        let publisher_stargaze = abs_stargaze
            .account_builder()
            .namespace(namespace)
            .build()?
            .publisher()?;
        publisher_stargaze.publish_app::<PingPongInterface<_>>()?;

        let remote_account = app
            .account()
            .remote_account_builder(mock_interchain.clone(), &abs_stargaze)
            .install_app_with_dependencies::<PingPongInterface<Daemon>>(
                &PingPongInstantiateMsg {},
                Empty {},
            )?
            .build()?;
        Ok(PingPong {
            abs_juno,
            abs_stargaze,
            ping_pong: app,
            remote_account,
            mock_interchain,
        })
    }
}

#[test]
fn successful_install() -> anyhow::Result<()> {
    let env = PingPong::setup()?;
    let app1 = env.ping_pong;

    let status = app1.status()?;
    assert_eq!(status, StatusResponse { pings: 0, pongs: 0 });

    let app2 = env.remote_account.application::<PingPongInterface<_>>()?;

    let status: StatusResponse = app2.status()?;

    assert_eq!(status, StatusResponse { pings: 0, pongs: 0 });
    Ok(())
}

#[test]
fn successful_ping() -> anyhow::Result<()> {
    // Create a sender and mock env
    let env = PingPong::setup()?;
    let app = env.ping_pong;
    let remote_app = env.remote_account.application::<PingPongInterface<_>>()?;

    let status = app.status()?;
    assert_eq!(status, StatusResponse { pings: 0, pongs: 0 });
    let status = remote_app.status()?;
    assert_eq!(status, StatusResponse { pings: 0, pongs: 0 });

    // juno pings stargaze
    let pp = app.ping(TruncatedChainId::from_chain_id(STARGAZE))?;
    env.mock_interchain.await_and_check_packets(JUNO, pp)?;

    // juno pinged, stargaze ponged.
    let status = app.status()?;
    assert_eq!(status, StatusResponse { pings: 1, pongs: 0 });
    let status = remote_app.status()?;
    assert_eq!(status, StatusResponse { pings: 0, pongs: 1 });

    // repeat
    let pp = app.ping(TruncatedChainId::from_chain_id(STARGAZE))?;
    env.mock_interchain.await_and_check_packets(JUNO, pp)?;

    let status = app.status()?;
    assert_eq!(status, StatusResponse { pings: 2, pongs: 0 });
    let status = remote_app.status()?;
    assert_eq!(status, StatusResponse { pings: 0, pongs: 2 });

    Ok(())
}

#[test]
fn successful_ping_to_home_chain() -> anyhow::Result<()> {
    // Create a sender and mock env
    let env = PingPong::setup()?;
    let app = env.ping_pong;
    let remote_app = env.remote_account.application::<PingPongInterface<_>>()?;

    // stargaze pings juno
    // Note that `RemoteApplication` takes care of waiting for ibc
    remote_app.execute(
        &ping_pong::msg::PingPongExecuteMsg::Ping {
            opponent_chain: TruncatedChainId::from_chain_id(JUNO),
        }
        .into(),
        vec![],
    )?;

    // stargaze pinged, juno ponged
    let status = app.status()?;
    assert_eq!(status, StatusResponse { pings: 0, pongs: 1 });
    let status = remote_app.status()?;
    assert_eq!(status, StatusResponse { pings: 1, pongs: 0 });

    // juno ping, stargaze pong
    let pp = app.ping(TruncatedChainId::from_chain_id(STARGAZE))?;
    env.mock_interchain.await_and_check_packets(JUNO, pp)?;

    let status = app.status()?;
    assert_eq!(status, StatusResponse { pings: 1, pongs: 1 });
    let status = remote_app.status()?;
    assert_eq!(status, StatusResponse { pings: 1, pongs: 1 });

    Ok(())
}
