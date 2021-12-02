import argparse
import sys

import part1 as parser1
import part2 as parser2


def execute_commands(parser, commands, position):
    for command in commands:
        parser.execute_command(command, position)
    return position["horizontal"] * position["depth"]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input_path")

    args = parser.parse_args()

    with open(args.input_path) as f:
        commands = f.read().splitlines()

    res = execute_commands(parser1, commands, {"horizontal": 0, "depth": 0})
    print(f"Prat one: {res}")

    res = execute_commands(parser2, commands, {"aim": 0, "horizontal": 0, "depth": 0})
    print(f"Prat two: {res}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
