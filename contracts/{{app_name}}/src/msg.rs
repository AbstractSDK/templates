use crate::contract::{{app_name | upper_camel_case}};

use cosmwasm_schema::QueryResponses;

// This is used for type safety and re-exporting the contract endpoint structs.
abstract_app::app_msg_types!({{app_name | upper_camel_case}}, {{app_name | upper_camel_case}}ExecuteMsg, {{app_name | upper_camel_case}}QueryMsg);

/// App instantiate message
#[cosmwasm_schema::cw_serde]
pub struct {{app_name | upper_camel_case}}InstantiateMsg {
    pub count: i32,
}

/// App execute messages
#[cosmwasm_schema::cw_serde]
#[derive(cw_orch::ExecuteFns)]
pub enum {{app_name | upper_camel_case}}ExecuteMsg {
    UpdateConfig {},
    /// Increment count by 1
    Increment {},
    /// Admin method - reset count
    Reset {
        /// Count value after reset
        count: i32,
    },
}

#[cosmwasm_schema::cw_serde]
pub struct {{app_name | upper_camel_case}}MigrateMsg {}

/// App query messages
#[cosmwasm_schema::cw_serde]
#[derive(QueryResponses, cw_orch::QueryFns)]
pub enum {{app_name | upper_camel_case}}QueryMsg {
    #[returns(ConfigResponse)]
    Config {},
    #[returns(CountResponse)]
    Count {},
}

#[cosmwasm_schema::cw_serde]
pub struct ConfigResponse {}

#[cosmwasm_schema::cw_serde]
pub struct CountResponse {
    pub count: i32,
}

{% if with_ibc %}
#[cosmwasm_schema::cw_serde]
pub enum IbcCallbackMsg {
    Empty {},
}

#[cosmwasm_schema::cw_serde]
pub struct IbcMsg {
}
{% endif %}