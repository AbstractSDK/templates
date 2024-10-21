pub mod contract;
pub mod error;
mod handlers;
pub mod msg;
mod replies;
pub mod state;

{% if with_ibc %}pub mod ibc;{% endif %}

pub use error::{{app_name | upper_camel_case}}Error;

/// The version of your app
pub const APP_VERSION: &str = env!("CARGO_PKG_VERSION");

pub use contract::interface::{{app_name | upper_camel_case}}Interface;

pub const {{project-name | shouty_snake_case}}_NAMESPACE: &str = "{{project-name}}";
pub const {{app_name | shouty_snake_case}}_NAME: &str = "{{app_name | kebab_case}}";
pub const {{app_name | shouty_snake_case}}_ID: &str = const_format::concatcp!({{project-name | shouty_snake_case}}_NAMESPACE, ":", {{app_name | shouty_snake_case}}_NAME);
