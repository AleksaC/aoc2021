def go_up(position, amount):
    position["aim"] -= int(amount)


def go_down(position, amount):
    position["aim"] += int(amount)


def go_forward(position, amount):
    position["horizontal"] += int(amount)
    position["depth"] += int(amount) * position["aim"]


COMMANDS = {"up": go_up, "down": go_down, "forward": go_forward}


def execute_command(command, position):
    cmd, *args = command.split()
    return COMMANDS[cmd](position, *args)
