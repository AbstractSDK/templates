use abstract_app::{sdk::AbstractResponse, std::ibc::ModuleIbcInfo};
use cosmwasm_std::{ensure_eq, from_json, Binary, DepsMut, Env, Response};

use crate::{
    contract::{PingPong, PingPongResult},
    error::PingPongError,
    msg::PingPongIbcMsg,
    state::PONGS,
};

pub fn receive_module_ibc(
    deps: DepsMut,
    _env: Env,
    module: PingPong,
    source_module: ModuleIbcInfo,
    msg: Binary,
) -> PingPongResult<Response> {
    let this_module_info = module.module_info()?;
    ensure_eq!(
        source_module.module,
        this_module_info,
        PingPongError::UnauthorizedIbc {
            source_module: source_module.module.clone()
        }
    );
    let ibc_msg: PingPongIbcMsg = from_json(msg)?;
    match ibc_msg {
        PingPongIbcMsg::Ping {} => PONGS.update(deps.storage, &source_module.chain, |pongs| {
            PingPongResult::Ok(pongs.unwrap_or_default() + 1)
        })?,
    };

    Ok(module.response("pong"))
}
