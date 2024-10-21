use abstract_standalone::{std::standalone::StandaloneInstantiateMsg,sdk::{AbstractResponse, AbstractSdkError, IbcInterface}};
use cosmwasm_std::{to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Reply, StdResult};

use crate::{
    msg::{
        ConfigResponse, CountResponse, {{standalone_name | upper_camel_case}}ExecuteMsg, {{standalone_name | upper_camel_case}}InstantiateMsg,
        {{standalone_name | upper_camel_case}}MigrateMsg, {{standalone_name | upper_camel_case}}QueryMsg,
    },
    state::{Config, CONFIG, COUNT},
    {{standalone_name | upper_camel_case}}, {{standalone_name | upper_camel_case}}Result, {{standalone_name | shouty_snake_case}}, {{standalone_name | shouty_snake_case}}_ID,
};

const INSTANTIATE_REPLY_ID: u64 = 0;

#[cfg_attr(feature = "export", cosmwasm_std::entry_point)]
pub fn instantiate(
    mut deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: {{standalone_name | upper_camel_case}}InstantiateMsg,
) -> {{standalone_name | upper_camel_case}}Result {
    let config: Config = Config {};
    CONFIG.save(deps.storage, &config)?;
    COUNT.save(deps.storage, &msg.count)?;

    // Init standalone as module
    let is_migratable = true;
    {{standalone_name | shouty_snake_case}}.instantiate(deps.branch(), info, StandaloneInstantiateMsg {}, is_migratable)?;

    Ok({{standalone_name | shouty_snake_case}}.response("init"))
}

#[cfg_attr(feature = "export", cosmwasm_std::entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: {{standalone_name | upper_camel_case}}ExecuteMsg,
) -> {{standalone_name | upper_camel_case}}Result {
    let standalone = {{standalone_name | shouty_snake_case}};
    match msg {
        {{standalone_name | upper_camel_case}}ExecuteMsg::UpdateConfig {} => update_config(deps, env, info, standalone),
        {{standalone_name | upper_camel_case}}ExecuteMsg::Increment {} => increment(deps, standalone),
        {{standalone_name | upper_camel_case}}ExecuteMsg::Reset { count } => reset(deps, env, info, count, standalone),
        {{standalone_name | upper_camel_case}}ExecuteMsg::IbcCallback(msg) => {
            let binding = {{standalone_name | shouty_snake_case}};
            let ibc_client = binding.ibc_client(deps.as_ref(), &env);

            let ibc_client_addr = ibc_client.module_address()?;
            if info.sender.ne(&ibc_client_addr) {
                return Err(AbstractSdkError::CallbackNotCalledByIbcClient {
                    caller: info.sender,
                    client_addr: ibc_client_addr,
                    module: {{standalone_name | shouty_snake_case}}_ID.to_owned(),
                }
                .into());
            };
            // Parse msg.callback here!
            Ok({{standalone_name | shouty_snake_case}}
                .response("test_ibc")
                .set_data(msg.callback.msg))
        }
        {{standalone_name | upper_camel_case}}ExecuteMsg::ModuleIbc(_msg) => {
            todo!()
        }
    }
}

/// Update the configuration of the standalone
fn update_config(deps: DepsMut, env: Env, info: MessageInfo, module: {{standalone_name | upper_camel_case}}) -> {{standalone_name | upper_camel_case}}Result {
    {{standalone_name | shouty_snake_case}}
        .admin
        .assert_admin(deps.as_ref(), &env, &info.sender)?;
    let mut _config = CONFIG.load(deps.storage)?;

    Ok(module.response("update_config"))
}

fn increment(deps: DepsMut, module: {{standalone_name | upper_camel_case}}) -> {{standalone_name | upper_camel_case}}Result {
    COUNT.update(deps.storage, |count| {{standalone_name | upper_camel_case}}Result::Ok(count + 1))?;

    Ok(module.response("increment"))
}

fn reset(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    count: i32,
    module: {{standalone_name | upper_camel_case}},
) -> {{standalone_name | upper_camel_case}}Result {
    {{standalone_name | shouty_snake_case}}
        .admin
        .assert_admin(deps.as_ref(), &env, &info.sender)?;
    COUNT.save(deps.storage, &count)?;

    Ok(module.response("reset"))
}

#[cfg_attr(feature = "export", cosmwasm_std::entry_point)]
pub fn query(deps: Deps, _env: Env, msg: {{standalone_name | upper_camel_case}}QueryMsg) -> StdResult<Binary> {
    let _standalone = &{{standalone_name | shouty_snake_case}};
    match msg {
        {{standalone_name | upper_camel_case}}QueryMsg::Config {} => to_json_binary(&query_config(deps)?),
        {{standalone_name | upper_camel_case}}QueryMsg::Count {} => to_json_binary(&query_count(deps)?),
    }
}

fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    let _config = CONFIG.load(deps.storage)?;
    Ok(ConfigResponse {})
}

fn query_count(deps: Deps) -> StdResult<CountResponse> {
    let count = COUNT.load(deps.storage)?;
    Ok(CountResponse { count })
}

#[cfg_attr(feature = "export", cosmwasm_std::entry_point)]
pub fn reply(_deps: DepsMut, _env: Env, msg: Reply) -> {{standalone_name | upper_camel_case}}Result {
    match msg.id {
        self::INSTANTIATE_REPLY_ID => Ok(crate::{{standalone_name | shouty_snake_case}}.response("instantiate_reply")),
        _ => todo!(),
    }
}

/// Handle the standalone migrate msg
#[cfg_attr(feature = "export", cosmwasm_std::entry_point)]
pub fn migrate(deps: DepsMut, _env: Env, _msg: {{standalone_name | upper_camel_case}}MigrateMsg) -> {{standalone_name | upper_camel_case}}Result {
    // The Abstract Standalone object does version checking and
    {{standalone_name | shouty_snake_case}}.migrate(deps)?;
    Ok({{standalone_name | shouty_snake_case}}.response("migrate"))
}
