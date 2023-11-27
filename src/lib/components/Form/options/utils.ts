import type {
	GroupedOption,
	GroupedParsedOption,
	Option,
	OptionItem,
	OptionParsedItem,
	OptionValue
} from './types';

export function isOptionGroup(item: OptionParsedItem): item is GroupedParsedOption {
	return 'group' in item;
}

export function isOption(item: Option | GroupedParsedOption | GroupedOption): item is Option {
	return 'value' in item;
}

export function isOptionValue(item: OptionItem): item is OptionValue {
	return typeof item === 'string' || typeof item === 'number';
}

export function getParsedOptions(items: Array<OptionItem>) {
	const result: Array<OptionParsedItem> = items.map((item) => {
		if (isOptionValue(item)) {
			return {
				label: item.toString(),
				value: item
			} satisfies Option;
		}

		if (isOption(item)) {
			return item;
		}

		return {
			group: item.group,
			items: getParsedOptions(item.items) as Array<Option>
		} satisfies GroupedParsedOption;
	});

	return result;
}

export function getFilteredOptions(options: Array<OptionParsedItem>, search: string | undefined) {
	if (search === undefined || search === '') {
		return options;
	}

	const result: Array<OptionParsedItem> = [];

	options.forEach((item) => {
		if (isOptionGroup(item)) {
			const filteredItems = getFilteredOptions(item.items, search);

			if (filteredItems.length > 0) {
				result.push({
					group: item.group,
					items: filteredItems as Array<Option>
				} satisfies GroupedParsedOption);
			}
		} else {
			if (item.label.toLowerCase().includes(search.toLowerCase())) {
				result.push(item);
			}
		}
	});

	return result;
}
