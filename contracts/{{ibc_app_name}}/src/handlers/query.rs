use cosmwasm_std::{to_json_binary, Binary, Deps, Env, StdResult};

use crate::{
    contract::{PingPong, PingPongResult},
    msg::{PingPongQueryMsg, StatusResponse},
    state::{PINGS, PONGS},
};

pub fn query_handler(
    deps: Deps,
    _env: Env,
    _module: &PingPong,
    msg: PingPongQueryMsg,
) -> PingPongResult<Binary> {
    match msg {
        PingPongQueryMsg::Status {} => to_json_binary(&query_status(deps)?),
    }
    .map_err(Into::into)
}

fn query_status(deps: Deps) -> StdResult<StatusResponse> {
    // Sum pings
    let pings = PINGS
        .range(deps.storage, None, None, cosmwasm_std::Order::Ascending)
        .map(|result| result.map(|(_k, v)| v).unwrap_or_default())
        .sum();
    // Sum pongs
    let pongs = PONGS
        .range(deps.storage, None, None, cosmwasm_std::Order::Ascending)
        .map(|result| result.map(|(_k, v)| v).unwrap_or_default())
        .sum();

    Ok(StatusResponse { pings, pongs })
}
