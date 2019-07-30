
// Get the defaults
const PROPLUGINS = isenv(process.env.PROPLUGINS);
const plugin_name = process.env.npm_package_name || 'Unknown';
const CI = isenv(process.env.CI);
const COLOR = CI ? false : isenv(process.env.npm_config_color);

function isenv(val) {
  return !!val && val !== '0' && val !== 'false';
}

function log(value) {
  console.log(COLOR ? value : value.replace(/\u001B\[[\d|1;\d]+m/g, ''));
}

function padr(value, size) {
  while(value.length < size) {
	value += ' ';
  }
  return value;
}

function padc(value, size) {
  while(value.length < size) {
	value = ' ' + value + ' ';
  }
  return value.substr(0, size);
}


function highlight(value, color) {
  if (color == null) { color = "33"; }
  return "\u001B["+color+"m"+value+"\u001B[37m";
}

if (!PROPLUGINS) {
  if (COLOR) {  console.log('\x07'); }
  log('\n\u001B[37m\u001B[1;41m--------------------------------[ \u001B[5m\u001B[33mWARNING\u001B[0m\u001B[1;41m\u001B[37m ]------------------------------------\u001B[0m');
  log('\u001B[37m\u001B[1;41m'+padr('- '+highlight(plugin_name)+' is DEPRECATED and is not maintained!', 88)+'-\u001B[0m');
  log('\u001B[37m\u001B[1;41m'+padr('- This plugin has NOT been tested in NS 6.x, and is likely to crash or fail!', 78)+'-\u001B[0m');
  log('\u001B[37m\u001B[1;41m'+padr('- ', 78)+'-\u001B[0m');
  log('\u001B[37m\u001B[1;41m'+padr('- Please switch to the supported, tested, and maintained version:', 78)+'-\u001B[0m');
  log('\u001B[37m\u001B[1;41m-'+padc(highlight('@proplugins/'+plugin_name), 87)+'-\u001B[0m');
  log('\u001B[37m\u001B[1;41m'+padr('- ', 78)+'-\u001B[0m');
  log('\u001B[37m\u001B[1;41m'+padr('- For more information see '+highlight('https://proplugins.org/upgrade'), 88)+'-\u001B[0m');
  log('\u001B[37m\u001B[1;41m-------------------------------------------------------------------------------\u001B[0m\n');

  if (!COLOR) {
//    console.log("\u001B[0m");
  }

  delay();
}

async function delay() {
  await new Promise( (resolve) => { setTimeout(resolve, 5000); } ); 
}

