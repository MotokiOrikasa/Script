//Checked in version 1.11.x
//Here you can read the position of the C100 in the frame
const C100_Position= await read("system", "board_location");

//mapping to number
const Position_To_Number = {
    BOTTOM_LEFT: 1,
    BOTTOM_RIGHT: 2,
    MID_LEFT: 3,
    MID_CENTER: 4,
    MID_RIGHT: 5,
    TOP_LEFT: 6,
    TOP_CENTER: 7,
    TOP_RIGHT: 8,
};

const C100_Number = Position_To_Number[C100_Position];

//Now you have a number corresponding to the C100 location in a frame
//use this number to make the IP address(mangement, stream, multicast) for each blade. For e.g: You can use it for creating the 3rd/4th octet in the IP 192.168.X.Y 

const IP_third_octet = 100 + C100_Number;

// Now you can combine all these. It will be something like this 192.168.IP_third_octet.Y   
// In the same way you can use it for multicast address

await write("network_interfaces.ports[0].desired_configuration.base.ip_addresses[0]", "ip_address", `10.100.${C100_Number}.104`);
await write("network_interfaces.ports[0].desired_configuration.base.routes[0]", "via", `10.100.${C100_Number}.254`);
await dispatch_change_request("network_interfaces.ports[0]", "save_config", "Click");
await write("network_interfaces.ports[1].desired_configuration.base.ip_addresses[0]", "ip_address", `10.200.${C100_Number}.104`);
await write("network_interfaces.ports[1].desired_configuration.base.routes[0]", "via", `10.200.${C100_Number}.254`);
await dispatch_change_request("network_interfaces.ports[1]", "save_config", "Click");
await write("network_interfaces.ports[2].desired_configuration.base.ip_addresses[0]", "ip_address", "192.168.99.106");
await write("network_interfaces.ports[2].desired_configuration.base.routes[0]", "via", "192.168.99.254");
await dispatch_change_request("network_interfaces.ports[2]", "save_config", "Click");
await write("network_interfaces.ports[3].desired_configuration.base.ip_addresses[0]", "ip_address", "192.168.123.104");
await write("network_interfaces.ports[3].desired_configuration.base.routes[0]", "via", "192.168.123.254");
await dispatch_change_request("network_interfaces.ports[3]", "save_config", "Click");
await dispatch_change_request("network_interfaces", "save_config", "Click");

await write("system.usrinfo", "short_desc", "Test RTR");

await write("system.usrinfo", "towel", "Ending Script...");
await pause_ms(200);

await write("system.usrinfo", "towel", "Blade will reboot soon...");
await pause_ms(200);

await write("system.usrinfo", "towel", "");
await pause_ms(500);

await write("system", "reboot", "reboot");
