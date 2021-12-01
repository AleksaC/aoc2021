function count_increases(measurements, window_size)
  local count = 0
  for i=1,#measurements-window_size,1 do
    if measurements[i + window_size] > measurements[i] then
      count = count + 1
    end
  end
  return count
end

if #arg ~= 1 then
  print("Input path needs to be specified, no other arguments are accepted")
  os.exit(1)
end
local input_path = arg[1]

local measurements = {}
local file = io.open(input_path)
if not file then
  print("Could not find file " .. input_path)
  os.exit(1)
end
local i = 1
while true do
  input = file:read()
  if input then
    measurements[i] = tonumber(input)
    i = i + 1
  else
    break
  end
end
file:close()

print("Part one: " .. count_increases(measurements, 1))
print("Part two: " .. count_increases(measurements, 3))
