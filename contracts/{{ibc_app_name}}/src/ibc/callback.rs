use abstract_app::{
    sdk::AbstractResponse,
    std::{
        ibc::{Callback, IbcResult},
        ABSTRACT_EVENT_TYPE,
    },
};
use cosmwasm_std::{from_json, DepsMut, Env};

use crate::{
    contract::{PingPong, PingPongResult},
    msg::PingPongCallbackMsg,
    state::PINGS,
};

pub fn ibc_callback(
    deps: DepsMut,
    _env: Env,
    module: PingPong,
    callback: Callback,
    result: IbcResult,
) -> PingPongResult {
    match from_json(callback.msg)? {
        PingPongCallbackMsg::Pinged { opponent_chain } => {
            let exec_events = result.get_execute_events()?;

            let pong = exec_events.into_iter().any(|e| {
                e.ty == ABSTRACT_EVENT_TYPE
                    && e.attributes
                        .iter()
                        .any(|a| a.key == "action" && a.value == "pong")
            });
            if pong {
                PINGS.update(deps.storage, &opponent_chain, |l| {
                    PingPongResult::Ok(l.unwrap_or_default() + 1)
                })?;
            }
            Ok(module.response("pong"))
        }
    }
}
