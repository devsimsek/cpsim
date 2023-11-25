# Assembly CPU Simulator
*This is a research project. *
This project simulates a simple assembly language interpreter for a CPU. It includes an AssemblyLexer for tokenizing assembly code, an AssemblyParser for interpreting tokens and executing CPU instructions, and a CPU simulator (Cpu class) to perform operations based on the parsed instructions.

## Usage

### Requirements
- Node.js

### Instructions
1. Clone or download this repository.
2. Install dependencies using `npm install`.
3. Run the simulation with `node main.js`.

## Project Structure

- `main.js`: Entry point of the application, demonstrating the usage of the AssemblyLexer, AssemblyParser, and Cpu classes.
- `asm.js`: Contains the AssemblyLexer and AssemblyParser classes responsible for tokenizing and parsing assembly code.
- `cpu.js`: Defines the Cpu class responsible for simulating CPU operations based on parsed instructions.

## Getting Started

To integrate this assembly language interpreter into your project, follow these steps:

1. Import the required classes into your project:
    ```javascript
    import { Cpu } from "./cpu.js";
    import { AssemblyLexer, AssemblyParser } from "./asm.js";
    ```

2. Create a new instance of the CPU:
    ```javascript
    let cpu = new Cpu();
    ```

3. Use the AssemblyLexer to tokenize assembly code:
    ```javascript
    let lexer = new AssemblyLexer("Your assembly code here");
    let tokens = lexer.tokenize();
    ```

4. Create an instance of the AssemblyParser and parse the tokens:
    ```javascript
    let parser = new AssemblyParser(tokens, cpu);
    parser.parse();
    ```

5. Execute the parsed instructions using the CPU.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## Author

- **devsimsek** - *Metin Şimşek*

## License

This project is licensed under the MIT License - see the [LICENSE](https://devsimsek.mit-license.org) file for details.
