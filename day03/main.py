import argparse
import sys


def most_bits(bit, count, total):
    target = "1" if count >= total - count else "0"
    return bit == target


def least_bits(bit, count, total):
    target = "0" if count >= total - count else "1"
    return bit == target


def life_support(diags, num_bits, criterion):
    for pos in range(num_bits):
        count = 0

        for num in diags:
            if num[pos] == "1":
                count += 1

        diags = list(filter(lambda x: criterion(x[pos], count, len(diags)), diags))

        if len(diags) == 1:
            return int(diags[0], 2)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input_path")

    args = parser.parse_args()

    with open(args.input_path) as f:
        diagnostics = f.read().splitlines()

    num_bits = len(diagnostics[0])

    counts = [0] * num_bits
    for num in diagnostics:
        for pos, bit in enumerate(num):
            if bit == "1":
                counts[pos] += 1

    total = len(diagnostics) // 2
    gamma = int("".join(["1" if count > total else "0" for count in counts]), 2)

    print(f"Part one: {gamma * (2 ** num_bits - gamma - 1)}")

    oxygen = life_support(diagnostics, num_bits, most_bits)
    co2 = life_support(diagnostics, num_bits, least_bits)

    print(f"Part two: {oxygen * co2}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
