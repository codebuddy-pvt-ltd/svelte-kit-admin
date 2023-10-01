export type OptionValue = string | number;

export interface Option {
	label: string;
	value: OptionValue;
	disabled?: boolean;
}

export interface GroupedOption {
	group: string;
	items: Array<Option | OptionValue>;
}
export interface GroupedBaseOption extends GroupedOption {
	items: Array<OptionValue>;
}

export type OptionItem = OptionValue | Option | GroupedOption;

export interface GroupedParsedOption {
	group: string;
	items: Array<Option>;
}

export type OptionParsedItem = Option | GroupedParsedOption;
