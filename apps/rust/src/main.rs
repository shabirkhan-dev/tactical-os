#![allow(dead_code)]
#![allow(unused_imports)]
#![allow(unused_variables)]

mod app;
mod modules;
mod server;
mod shared;

#[tokio::main]
async fn main() {
    server::start_server().await;
}
