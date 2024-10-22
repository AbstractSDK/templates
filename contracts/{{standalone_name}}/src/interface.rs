use cw_orch::contract::{interface_traits::InstantiableContract, Contract};
use cw_orch::prelude::*;
use abstract_standalone::objects::dependency::StaticDependency;
use abstract_standalone::traits::Dependencies;

use crate::{
    msg::*, {{standalone_name | shouty_snake_case}}
};

#[cw_orch::interface(
    {{standalone_name | upper_camel_case}}InstantiateMsg,
    {{standalone_name | upper_camel_case}}ExecuteMsg,
    {{standalone_name | upper_camel_case}}QueryMsg,
    {{standalone_name | upper_camel_case}}MigrateMsg
)]
pub struct {{standalone_name | upper_camel_case}}Interface;

impl<Chain: cw_orch::environment::CwEnv> abstract_interface::DependencyCreation
    for {{standalone_name | upper_camel_case}}Interface<Chain>
{
    type DependenciesConfig = cosmwasm_std::Empty;
}

impl<Chain: cw_orch::environment::CwEnv> abstract_interface::RegisteredModule
    for {{standalone_name | upper_camel_case}}Interface<Chain>
{
    type InitMsg = <{{standalone_name | upper_camel_case}}Interface<Chain> as InstantiableContract>::InstantiateMsg;

    fn dependencies<'a>() -> &'a [StaticDependency] {
        {{standalone_name | shouty_snake_case}}.dependencies()
    }

    fn module_id<'a>() -> &'a str {
        {{standalone_name | shouty_snake_case}}.module_id()
    }

    fn module_version<'a>() -> &'a str {
        {{standalone_name | shouty_snake_case}}.version()
    }
}

impl<Chain: cw_orch::environment::CwEnv> From<Contract<Chain>> for {{standalone_name | upper_camel_case}}Interface<Chain> {
    fn from(value: Contract<Chain>) -> Self {
        {{standalone_name | upper_camel_case}}Interface(value)
    }
}

impl<Chain: cw_orch::environment::CwEnv> Uploadable for {{standalone_name | upper_camel_case}}Interface<Chain> {
    fn wasm(_chain: &ChainInfoOwned) -> WasmPath {
        let wasm_name = env!("CARGO_CRATE_NAME").replace('-', "_");
        cw_orch::prelude::ArtifactsDir::auto(Some(env!("CARGO_MANIFEST_DIR").to_string()))
            .find_wasm_path(&wasm_name)
            .unwrap()
    }

    fn wrapper() -> Box<dyn MockContract<Empty, Empty>> {
        Box::new(
            ContractWrapper::new_with_empty(
                crate::contract::execute,
                crate::contract::instantiate,
                crate::contract::query,
            )
            .with_migrate(crate::contract::migrate),
        )
    }
}

impl<Chain: cw_orch::environment::CwEnv> abstract_interface::StandaloneDeployer<Chain>
    for {{standalone_name | upper_camel_case}}Interface<Chain>
{
}
