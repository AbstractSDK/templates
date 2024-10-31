pub mod contract;
pub mod error;
mod handlers;
mod ibc;
pub mod msg;
pub mod state;

pub use contract::interface::PingPongInterface;
pub use msg::{PingPongExecuteMsgFns, PingPongQueryMsgFns};

/// The version of your app
pub const APP_VERSION: &str = env!("CARGO_PKG_VERSION");

pub const TESTGEN_LOCAL_NAMESPACE: &str = "testgen-local";
pub const PING_PONG_NAME: &str = "ping-pong";
pub const PING_PONG_ID: &str =
    const_format::concatcp!(TESTGEN_LOCAL_NAMESPACE, ":", PING_PONG_NAME);
