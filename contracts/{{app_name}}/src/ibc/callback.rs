use abstract_app::{
    sdk::AbstractResponse,
    std::ibc::{Callback, IbcResult},
};
use cosmwasm_std::{DepsMut, Env};

use crate::contract::{
    {{app_name | upper_camel_case}}, {{app_name | upper_camel_case}}Result
};

pub fn ibc_callback(
    _deps: DepsMut,
    _env: Env,
    module: {{app_name | upper_camel_case}},
    _callback: Callback,
    _result: IbcResult,
) -> {{app_name | upper_camel_case}}Result {
    Ok(module.response("callback"))
}