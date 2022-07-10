use serde_json::Value;
use std::fs::File;
use std::io::prelude::*;

mod dbcontroller;

#[tauri::command]
fn save_order(order: String) {
    let json_order: Value = serde_json::from_str(&order).unwrap();
    println!("Time: {}", json_order["timestamp"]);
    dbcontroller::print_hello();
    let mut f = File::create("order.txt").unwrap();
    f.write_all(order.as_bytes()).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_order])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
