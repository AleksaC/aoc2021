package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func readInput(filePath string) string {
	data, err := ioutil.ReadFile(filePath)
	check(err)
	return string(data)
}

func countIncreases(measurements []int, windowSize int) int {
	count := 0
	for i := 0; i < len(measurements)-windowSize; i++ {
		if measurements[i+windowSize] > measurements[i] {
			count++
		}
	}
	return count
}

func main() {
	args := os.Args[1:]
	if len(args) != 1 {
		fmt.Println("Input path needs to be specified, no other arguments are accepted")
		os.Exit(1)
	}
	inputFile := args[0]

	data := readInput(inputFile)
	inputs := strings.Split(strings.TrimRight(data, "\n"), "\n")
	measurements := make([]int, len(inputs))
	for i, v := range inputs {
		entry, err := strconv.Atoi(v)
		check(err)
		measurements[i] = entry
	}

	fmt.Println("Part one:", countIncreases(measurements, 1))
	fmt.Println("Part two:", countIncreases(measurements, 3))
}
