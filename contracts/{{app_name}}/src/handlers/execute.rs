use crate::{
    contract::{
        {{app_name | upper_camel_case}}, {{app_name | upper_camel_case}}Result
    },
    msg::{{app_name | upper_camel_case}}ExecuteMsg,
    state::{CONFIG, COUNT},
};

use abstract_app::traits::AbstractResponse;
use cosmwasm_std::{DepsMut, Env, MessageInfo};

pub fn execute_handler(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    module: {{app_name | upper_camel_case}},
    msg: {{app_name | upper_camel_case}}ExecuteMsg,
) -> {{app_name | upper_camel_case}}Result {
    match msg {
        {{app_name | upper_camel_case}}ExecuteMsg::UpdateConfig {} => update_config(deps, env, info, module),
        {{app_name | upper_camel_case}}ExecuteMsg::Increment {} => increment(deps, module),
        {{app_name | upper_camel_case}}ExecuteMsg::Reset { count } => reset(deps, env, info, count, module),
    }
}

/// Update the configuration of the app
fn update_config(deps: DepsMut, env: Env, msg_info: MessageInfo, module: {{app_name | upper_camel_case}}) -> {{app_name | upper_camel_case}}Result {
    // Only the admin should be able to call this
    module.admin.assert_admin(deps.as_ref(), &env, &msg_info.sender)?;
    let mut _config = CONFIG.load(deps.storage)?;

    Ok(module.response("update_config"))
}

fn increment(deps: DepsMut, module: {{app_name | upper_camel_case}}) -> {{app_name | upper_camel_case}}Result {
    COUNT.update(deps.storage, |count| {{app_name | upper_camel_case}}Result::Ok(count + 1))?;

    Ok(module.response("increment"))
}

fn reset(deps: DepsMut, env: Env, info: MessageInfo, count: i32, module: {{app_name | upper_camel_case}}) -> {{app_name | upper_camel_case}}Result {
    module.admin.assert_admin(deps.as_ref(), &env, &info.sender)?;
    COUNT.save(deps.storage, &count)?;

    Ok(module.response("reset"))
}
