use abstract_app::{
    objects::TruncatedChainId,
    sdk::{IbcClient, IbcInterface},
    std::ibc::Callback,
    traits::AbstractResponse,
};
use cosmwasm_std::{CosmosMsg, DepsMut, Env, MessageInfo};

use crate::{
    contract::{PingPong, PingPongResult},
    msg::{PingPongCallbackMsg, PingPongExecuteMsg, PingPongIbcMsg},
};

pub fn execute_handler(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    module: PingPong,
    msg: PingPongExecuteMsg,
) -> PingPongResult {
    match msg {
        PingPongExecuteMsg::Ping { opponent_chain } => {
            ping_pong(deps, &env, opponent_chain, module)
        }
    }
}

pub(crate) fn ping_pong(
    deps: DepsMut,
    env: &Env,
    opponent_chain: TruncatedChainId,
    module: PingPong,
) -> PingPongResult {
    // # ANCHOR: ibc_client
    let self_module_info = module.module_info()?;
    let ibc_client: IbcClient<_> = module.ibc_client(deps.as_ref(), env);
    let ibc_action: CosmosMsg = ibc_client.module_ibc_action(
        opponent_chain.clone(),
        self_module_info,
        // Start by playing a Ping
        &PingPongIbcMsg::Ping {},
        Some(Callback::new(&PingPongCallbackMsg::Pinged {
            opponent_chain,
        })?),
    )?;
    // # ANCHOR_END: ibc_client

    Ok(module.response("ping").add_message(ibc_action))
}
