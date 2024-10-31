use cosmwasm_std::{DepsMut, Env, MessageInfo, Response};

use crate::{
    contract::{PingPong, PingPongResult},
    msg::PingPongInstantiateMsg,
};

pub fn instantiate_handler(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _module: PingPong,
    _msg: PingPongInstantiateMsg,
) -> PingPongResult {
    Ok(Response::new())
}
