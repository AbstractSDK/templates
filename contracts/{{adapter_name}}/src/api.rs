use crate::{
    msg::{
        {{adapter_name | upper_camel_case}}ExecuteMsg, {{adapter_name | upper_camel_case}}QueryMsg
    },
    {{adapter_name | shouty_snake_case}}_ID,
};

use abstract_adapter::sdk::{
    features::{AccountIdentification, Dependencies, ModuleIdentification},
    AbstractSdkResult, AdapterInterface,
};
use abstract_adapter::std::objects::module::ModuleId;
use cosmwasm_schema::serde::de::DeserializeOwned;
use cosmwasm_std::{CosmosMsg, Deps, Uint128};

// API for Abstract SDK users
/// Interact with your adapter in other modules.
pub trait {{adapter_name | upper_camel_case}}Api: AccountIdentification + Dependencies + ModuleIdentification {
    /// Construct a new adapter interface.
    fn {{adapter_name | snake_case}}<'a>(&'a self, deps: Deps<'a>) -> {{adapter_name | upper_camel_case}}<'a, Self> {
        {{adapter_name | upper_camel_case}} {
            base: self,
            deps,
            module_id: {{adapter_name | shouty_snake_case}}_ID,
        }
    }
}

impl<T: AccountIdentification + Dependencies + ModuleIdentification> {{adapter_name | upper_camel_case}}Api for T {}

#[derive(Clone)]
pub struct {{adapter_name | upper_camel_case}}<'a, T: {{adapter_name | upper_camel_case}}Api> {
    pub base: &'a T,
    pub module_id: ModuleId<'a>,
    pub deps: Deps<'a>,
}

impl<'a, T: {{adapter_name | upper_camel_case}}Api> {{adapter_name | upper_camel_case}}<'a, T> {
    /// Set the module id
    pub fn with_module_id(self, module_id: ModuleId<'a>) -> Self {
        Self { module_id, ..self }
    }

    /// returns the HUB module id
    fn module_id(&self) -> ModuleId {
        self.module_id
    }

    /// Executes a [{{adapter_name | upper_camel_case}}ExecuteMsg] in the adapter
    fn request(&self, msg: {{adapter_name | upper_camel_case}}ExecuteMsg) -> AbstractSdkResult<CosmosMsg> {
        let adapters = self.base.adapters(self.deps);

        adapters.execute(self.module_id(), msg)
    }

    /// Route message
    pub fn update_config(&self) -> AbstractSdkResult<CosmosMsg> {
        self.request({{adapter_name | upper_camel_case}}ExecuteMsg::UpdateConfig {})
    }
}

/// Queries
impl<T: {{adapter_name | upper_camel_case}}Api> {{adapter_name | upper_camel_case}}<'_, T> {
    /// Query your adapter via message type
    pub fn query<R: DeserializeOwned>(&self, query_msg: {{adapter_name | upper_camel_case}}QueryMsg) -> AbstractSdkResult<R> {
        let adapters = self.base.adapters(self.deps);
        adapters.query(self.module_id(), query_msg)
    }

    /// Query config
    pub fn config(&self) -> AbstractSdkResult<Uint128> {
        self.query({{adapter_name | upper_camel_case}}QueryMsg::Config {})
    }
}
