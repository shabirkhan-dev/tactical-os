local has_lua = os.execute("command -v lua >/dev/null 2>&1")
local lua_cmd = (has_lua == true or has_lua == 0) and "lua" or "lua5.4"
local handle = io.popen(lua_cmd .. " scripts/lua/main.lua")
if handle == nil then
    error("failed to execute lua main script")
end

local output = handle:read("*a")
handle:close()

assert(output:match("Hello from Starter Kit scripts %(lua%)"), "unexpected lua output")
print("lua test passed")
