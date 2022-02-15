import {CommandHistory} from "@/puzzles/commands/CommandHistory";
import {Puzzle} from "@/puzzles/Puzzle";
import {AbstractCommand} from "@/puzzles/commands/AbstractCommand";
import {Edge} from "@/puzzles/Edge";
import {ToggleEdgeCommand} from "@/puzzles/commands/ToggleEdgeCommand";
import {InterfaceConfig} from "@/puzzles/interface/InterfaceConfig";
import {EdgeClickedAction} from "@/puzzles/interface/EdgeClickedAction";
import {ToggleDisableEdgeCommand} from "@/puzzles/commands/ToggleDisableEdgeCommand";
import {Tile} from "@/puzzles/Tile";
import {TileClickedAction} from "@/puzzles/interface/TileClickedAction";
import {CycleThroughTileValuesCommand} from "@/puzzles/commands/CycleThroughTileValuesCommand";

export class PuzzleInterface {
    puzzle: Puzzle;
    commands: CommandHistory;
    config: InterfaceConfig;

    constructor(puzzle: Puzzle) {
        this.puzzle = puzzle;
        this.config = puzzle.puzzleConfig.solvingConfig;
        this.commands = new CommandHistory();
    }

    public performEdgeClickAction(edge: Edge, left: boolean): void {
        const action = left ? this.config.edgeLeftClicked : this.config.edgeRightClicked;
        switch (action) {
            case EdgeClickedAction.ToggleEdgeValue:
                return this.do(new ToggleEdgeCommand(this.puzzle, edge));
            case EdgeClickedAction.ToggleEdgeDisabled:
                return this.do(new ToggleDisableEdgeCommand(this.puzzle, edge));
        }
    }

    public performTileClickAction(tile: Tile, left: boolean): void {
        const action = left ? this.config.tileLeftClicked : this.config.tileRightClicked;
        switch (action) {
            case TileClickedAction.CycleThroughValues:
                return this.do(new CycleThroughTileValuesCommand(this.puzzle, tile));
        }
    }

    private do(command: AbstractCommand): void {
        this.commands.do(command);
    }

    public undo(): void {
        this.commands.undo()
    }

    public redo(): void {
        this.commands.redo()
    }
}
