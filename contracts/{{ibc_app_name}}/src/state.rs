use abstract_app::objects::TruncatedChainId;
use cw_storage_plus::Map;

pub const PINGS: Map<&TruncatedChainId, u32> = Map::new("pings");
pub const PONGS: Map<&TruncatedChainId, u32> = Map::new("pongs");
