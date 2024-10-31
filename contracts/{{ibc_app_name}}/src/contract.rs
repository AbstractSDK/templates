use abstract_app::{objects::dependency::StaticDependency, std::IBC_CLIENT, AppContract};
use cosmwasm_std::Response;

use crate::{
    error::PingPongError,
    handlers, ibc,
    msg::{AppMigrateMsg, PingPongExecuteMsg, PingPongInstantiateMsg, PingPongQueryMsg},
    APP_VERSION, PING_PONG_ID,
};

/// The type of the result returned by your app's entry points.
pub type PingPongResult<T = Response> = Result<T, PingPongError>;

/// The type of the app that is used to build your app and access the Abstract SDK features.
pub type PingPong = AppContract<
    PingPongError,
    PingPongInstantiateMsg,
    PingPongExecuteMsg,
    PingPongQueryMsg,
    AppMigrateMsg,
>;

const APP: PingPong = PingPong::new(PING_PONG_ID, APP_VERSION, None)
    .with_instantiate(handlers::instantiate_handler)
    .with_execute(handlers::execute_handler)
    .with_query(handlers::query_handler)
    .with_dependencies(&[StaticDependency::new(
        IBC_CLIENT,
        &[abstract_ibc_client::contract::CONTRACT_VERSION],
    )])
    .with_module_ibc(ibc::receive_module_ibc)
    .with_ibc_callback(ibc::ibc_callback);

// Export handlers
#[cfg(feature = "export")]
abstract_app::export_endpoints!(APP, PingPong);

abstract_app::cw_orch_interface!(APP, PingPong, PingPongInterface);

#[cfg(not(target_arch = "wasm32"))]
use abstract_app::std::account::ModuleInstallConfig;
#[cfg(not(target_arch = "wasm32"))]
impl<Chain: cw_orch::environment::CwEnv> abstract_app::abstract_interface::DependencyCreation
    for crate::PingPongInterface<Chain>
{
    type DependenciesConfig = cosmwasm_std::Empty;

    fn dependency_install_configs(
        _configuration: Self::DependenciesConfig,
    ) -> Result<Vec<ModuleInstallConfig>, abstract_app::abstract_interface::AbstractInterfaceError>
    {
        Ok(vec![ModuleInstallConfig::new(
            abstract_app::objects::module::ModuleInfo::from_id(
                IBC_CLIENT,
                abstract_ibc_client::contract::CONTRACT_VERSION.into(),
            )?,
            None,
        )])
    }
}
