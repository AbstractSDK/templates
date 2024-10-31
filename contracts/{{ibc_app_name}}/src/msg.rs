use abstract_app::objects::TruncatedChainId;
use cosmwasm_schema::QueryResponses;

use crate::contract::PingPong;

// This is used for type safety and re-exporting the contract endpoint structs.
abstract_app::app_msg_types!(PingPong, PingPongExecuteMsg, PingPongQueryMsg);

/// App instantiate message
#[cosmwasm_schema::cw_serde]
pub struct PingPongInstantiateMsg {}

/// App execute messages
#[cosmwasm_schema::cw_serde]
#[derive(cw_orch::ExecuteFns)]
pub enum PingPongExecuteMsg {
    /// Increment ping in this module and pong on its counterpart on another chain.
    Ping { opponent_chain: TruncatedChainId },
}

/// App query messages
#[cosmwasm_schema::cw_serde]
#[derive(QueryResponses, cw_orch::QueryFns)]
pub enum PingPongQueryMsg {
    #[returns(StatusResponse)]
    Status {},
}

#[cosmwasm_schema::cw_serde]
pub enum PingPongIbcMsg {
    Ping {},
}

#[cosmwasm_schema::cw_serde]
pub enum PingPongCallbackMsg {
    Pinged { opponent_chain: TruncatedChainId },
}

#[cosmwasm_schema::cw_serde]
pub struct AppMigrateMsg {}

#[cosmwasm_schema::cw_serde]
pub struct StatusResponse {
    pub pings: u32,
    pub pongs: u32,
}
