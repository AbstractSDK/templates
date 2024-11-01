//! Publishes the module to the Abstract platform by uploading it and registering it on the app store.
//!
//! Info: The mnemonic used to register the module must be the same as the owner of the account that claimed the namespace.
//!
//! ## Example
//!
//! ```bash
//! $ just publish {{app_name | kebab_case}} uni-6 osmo-test-5
//! ```
use {{app_name | snake_case}}::{{app_name | shouty_snake_case}}_ID;

use abstract_app::objects::namespace::Namespace;
use abstract_client::{AbstractClient, Publisher};
use clap::Parser;
use cw_orch::{anyhow, daemon::networks::parse_network, prelude::*, tokio::runtime::Runtime};
use {{app_name | snake_case}}::{{app_name | upper_camel_case}}Interface;

fn publish(networks: Vec<ChainInfo>) -> anyhow::Result<()> {
    // run for each requested network
    for network in networks {
        // Setup
        let rt = Runtime::new()?;
        let chain = DaemonBuilder::new(network)
            .handle(rt.handle())
            .build()?;

        let app_namespace = Namespace::from_id({{app_name | shouty_snake_case}}_ID)?;

        // Create an [`AbstractClient`]
        let abstract_client: AbstractClient<Daemon> = AbstractClient::new(chain.clone())?;

        // Get the [`Account`] that owns the namespace, otherwise create a new one and claim the namespace
        let publisher_acc = abstract_client.fetch_or_build_account(app_namespace, |builder| builder.namespace(Namespace::from_id({{app_name | shouty_snake_case}}_ID).unwrap()))?;

        // Get the [`Publisher`]
        let publisher: Publisher<_> = publisher_acc.publisher()?;

        if publisher.account().owner()? != chain.sender_addr() {
            panic!("The current sender can not publish to this namespace. Please use the wallet that owns the Account that owns the Namespace.")
        }

        // Publish the App to the Abstract Platform
        publisher.publish_app::<{{app_name | upper_camel_case}}Interface<Daemon>>()?;
    }
    Ok(())
}

#[derive(Parser, Default, Debug)]
#[command(author, version, about, long_about = None)]
struct Arguments {
    /// Network Id to publish on
    #[arg(short, long, value_delimiter = ' ', num_args = 1..)]
    network_ids: Vec<String>,
}

fn main() {
    dotenv::dotenv().ok();
    env_logger::init();
    let args = Arguments::parse();
    let networks = args
        .network_ids
        .iter()
        .map(|n| parse_network(n).unwrap())
        .collect();
    publish(networks).unwrap();
}
