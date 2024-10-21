use crate::{
    error::{{app_name | upper_camel_case}}Error,
    handlers,
    msg::{
        {{app_name | upper_camel_case}}ExecuteMsg, {{app_name | upper_camel_case}}InstantiateMsg, {{app_name | upper_camel_case}}MigrateMsg, {{app_name | upper_camel_case}}QueryMsg
    },
    replies::{self, INSTANTIATE_REPLY_ID},
    APP_VERSION, {{app_name | shouty_snake_case}}_ID,
};

use abstract_app::AppContract;
use cosmwasm_std::Response;

/// The type of the result returned by your app's entry points.
pub type {{app_name | upper_camel_case}}Result<T = Response> = Result<T, {{app_name | upper_camel_case}}Error>;

/// The type of the app that is used to build your app and access the Abstract SDK features.
pub type {{app_name | upper_camel_case}} =
    AppContract<{{app_name | upper_camel_case}}Error, {{app_name | upper_camel_case}}InstantiateMsg, {{app_name | upper_camel_case}}ExecuteMsg, {{app_name | upper_camel_case}}QueryMsg, {{app_name | upper_camel_case}}MigrateMsg>;

const APP: {{app_name | upper_camel_case}} = {{app_name | upper_camel_case}}::new({{app_name | shouty_snake_case}}_ID, APP_VERSION, None)
    .with_instantiate(handlers::instantiate_handler)
    .with_execute(handlers::execute_handler)
    .with_query(handlers::query_handler)
    .with_migrate(handlers::migrate_handler)
    .with_replies(&[(INSTANTIATE_REPLY_ID, replies::instantiate_reply)]){% if with_ibc %}
    .with_ibc_callback(crate::ibc::ibc_callback)
    .with_module_ibc(crate::ibc::receive_module_ibc){% endif %}
    .with_dependencies(&[]);

// Export handlers
#[cfg(feature = "export")]
abstract_app::export_endpoints!(APP, {{app_name | upper_camel_case}});

abstract_app::cw_orch_interface!(APP, {{app_name | upper_camel_case}}, {{app_name | upper_camel_case}}Interface);

// TODO: add to docmuentation
// https://linear.app/abstract-sdk/issue/ABS-414/add-documentation-on-dependencycreation-trait
#[cfg(not(target_arch = "wasm32"))]
impl<Chain: cw_orch::environment::CwEnv> abstract_interface::DependencyCreation
    for crate::{{app_name | upper_camel_case}}Interface<Chain>
{
    type DependenciesConfig = cosmwasm_std::Empty;
}
