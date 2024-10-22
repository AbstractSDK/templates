use abstract_app::std::ibc::ModuleIbcInfo;
use cosmwasm_std::{Binary, DepsMut, Env, Response, from_json};

use crate::{
    contract::{
        {{app_name | upper_camel_case}}, {{app_name | upper_camel_case}}Result
    },
    msg::IbcMsg,
};

pub fn receive_module_ibc(
    _deps: DepsMut,
    _env: Env,
    _module: {{app_name | upper_camel_case}},
    _source_module: ModuleIbcInfo,
    msg: Binary,
) -> {{app_name | upper_camel_case}}Result {
    let _msg: IbcMsg = from_json(&msg)?;
    // do something with received _msg
    Ok(Response::new())
}
