use anyhow::Result;
use bytes::Bytes;
use spin_sdk::{
    redis_component,
    sqlite::{Connection, ValueParam},
};
use std::str::from_utf8;


#[redis_component]
fn on_message(message: Bytes) -> Result<()> {
    let message_str = from_utf8(&message)?;
    println!("Message received: {}", message_str);

    let execute_params = [
        ValueParam::Text(message_str),
    ];
    let connection = Connection::open_default()?;
    connection.execute(
        "INSERT INTO votes(name, votes) VALUES(?,1) ON CONFLICT(name) DO UPDATE SET votes=votes+1;",
        execute_params.as_slice(),
    )?;

    Ok(())
}
