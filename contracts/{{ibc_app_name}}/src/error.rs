use abstract_app::{
    objects::module::ModuleInfo, sdk::AbstractSdkError, std::AbstractError,
    AppError as AbstractAppError,
};
use cosmwasm_std::StdError;
use cw_asset::AssetError;
use cw_controllers::AdminError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum PingPongError {
    #[error(transparent)]
    Std(#[from] StdError),

    #[error(transparent)]
    Abstract(#[from] AbstractError),

    #[error(transparent)]
    AbstractSdk(#[from] AbstractSdkError),

    #[error(transparent)]
    Asset(#[from] AssetError),

    #[error(transparent)]
    Admin(#[from] AdminError),

    #[error(transparent)]
    DappError(#[from] AbstractAppError),

    #[error("Caller module is not a PingPong: {source_module}")]
    UnauthorizedIbc { source_module: ModuleInfo },
}
