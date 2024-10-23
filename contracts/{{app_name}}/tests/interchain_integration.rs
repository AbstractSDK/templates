use {{app_name | snake_case}}::{
    contract::interface::{{app_name | upper_camel_case}}Interface,
    msg::{
        ConfigResponse, CountResponse, {{app_name | upper_camel_case}}ExecuteMsg, {{app_name | upper_camel_case}}InstantiateMsg, {{app_name | upper_camel_case}}QueryMsgFns,
    },
    {{app_name | upper_camel_case}}Error, TESTGEN_LOCAL_NAMESPACE,
};

use abstract_app::objects::namespace::Namespace;
use abstract_client::{AbstractInterchainClient, Environment, RemoteApplication};
use cw_controllers::AdminError;
// Use prelude to get all the necessary imports
use cw_orch::{anyhow, prelude::*};
use cw_orch_interchain::prelude::*;

const JUNO_CHAIN_ID: &str = "juno-1";
const OSMOSIS_CHAIN_ID: &str = "osmosis-1";

struct TestInterchainEnv<Env: IbcQueryHandler, IBC: InterchainEnv<Env>> {
    abs: AbstractInterchainClient<Env>,
    remote_app: RemoteApplication<Env, IBC, {{app_name | upper_camel_case}}Interface<Env>>,
}

impl TestInterchainEnv<MockBech32, MockBech32InterchainEnv> {
    /// Set up the test environment with an Account that has the App installed and remote account with the same app installed
    fn setup() -> anyhow::Result<TestInterchainEnv<MockBech32, MockBech32InterchainEnv>> {
        // Create mock interchain env
        let mock_interchain =
            MockBech32InterchainEnv::new(vec![(JUNO_CHAIN_ID, "juno"), (OSMOSIS_CHAIN_ID, "osmo")]);

        // You can set up interchain Abstract with a helper
        let abs = AbstractInterchainClient::deploy_mock(&mock_interchain)?;
        let abs_juno = abs.client(JUNO_CHAIN_ID).unwrap();
        let abs_osmosis = abs.client(OSMOSIS_CHAIN_ID).unwrap();

        // Publish on remote chain
        let namespace = Namespace::new(TESTGEN_LOCAL_NAMESPACE)?;
        let publisher_osmosis = abs_osmosis.publisher_builder(namespace).build()?;
        publisher_osmosis.publish_app::<{{app_name | upper_camel_case}}Interface<_>>()?;

        // To create remote account you need to enable ibc by installing ibc-client on account
        let account_juno = abs_juno.account_builder().build()?;
        account_juno.set_ibc_status(true)?;
        // Create remote account with app installed
        let remote_account = account_juno
            .remote_account_builder(mock_interchain.clone(), &abs_osmosis)
            .install_app::<{{app_name | upper_camel_case}}Interface<MockBech32>>(&{{app_name | upper_camel_case}}InstantiateMsg { count: 0 })?
            .build()?;
        let remote_app = remote_account.application::<{{app_name | upper_camel_case}}Interface<_>>()?;

        Ok(TestInterchainEnv { abs, remote_app })
    }
}

#[test]
fn successful_install() -> anyhow::Result<()> {
    // Start by deploying abstract completely
    let env = TestInterchainEnv::setup()?;
    let remote_app = env.remote_app;

    let config = remote_app.config()?;
    assert_eq!(config, ConfigResponse {});
    Ok(())
}

#[test]
fn successful_increment() -> anyhow::Result<()> {
    let env = TestInterchainEnv::setup()?;
    let remote_app = env.remote_app;

    let app_msg = {{app_name | upper_camel_case}}ExecuteMsg::Increment {}.into();
    remote_app.execute(&app_msg, vec![])?;
    let count: CountResponse = remote_app.count()?;
    assert_eq!(count.count, 1);
    Ok(())
}

#[test]
fn successful_reset() -> anyhow::Result<()> {
    let env = TestInterchainEnv::setup()?;
    let remote_app = env.remote_app;

    let app_msg = {{app_name | upper_camel_case}}ExecuteMsg::Reset { count: 42 }.into();
    remote_app.execute(&app_msg, vec![])?;
    let count: CountResponse = remote_app.count()?;
    assert_eq!(count.count, 42);
    Ok(())
}

#[test]
fn failed_reset() -> anyhow::Result<()> {
    let env = TestInterchainEnv::setup()?;
    let remote_app = env.remote_app;
    let remote_chain = env.abs.client(OSMOSIS_CHAIN_ID).unwrap().environment();

    // Only your account can execute on your remote application
    let remote_app_address = remote_app.address()?;
    let err: {{app_name | upper_camel_case}}Error = remote_chain
        .execute(
            &{{app_name | snake_case}}::msg::ExecuteMsg::from({{app_name | upper_camel_case}}ExecuteMsg::Reset { count: 9 }),
            &[],
            &remote_app_address,
        )
        .unwrap_err()
        .downcast()
        .unwrap();
    assert_eq!(err, {{app_name | upper_camel_case}}Error::Admin(AdminError::NotAdmin {}));
    Ok(())
}

#[test]
fn update_config() -> anyhow::Result<()> {
    let env = TestInterchainEnv::setup()?;
    let remote_app = env.remote_app;

    let app_msg = {{app_name | upper_camel_case}}ExecuteMsg::UpdateConfig {}.into();
    remote_app.execute(&app_msg, vec![])?;
    let config = remote_app.config()?;
    let expected_response = {{app_name | snake_case}}::msg::ConfigResponse {};
    assert_eq!(config, expected_response);
    Ok(())
}
