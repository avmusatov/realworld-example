import { ChangeEvent, FC, useState, useEffect, useRef, useCallback } from 'react';
import { Option } from './option';
import Icon from './icon';
import {
    Container,
    Menu,
    SelectControl,
    SelectedOptionsList,
    SelectedOptionContainer,
    SelectedOption,
    DeleteButton,
    ControlIcons,
    DefaultLabel,
    StyledInput,
} from './styledComponents';

const ENTER_KEY_CODE = 'Enter';

interface IOption {
    label: string;
    value: string;
}

export interface IOrderedOption extends IOption {
    order: number;
}

interface Props {
    options: IOption[];
    selectedOptions: IOrderedOption[];
    updateSelectedOptions: any;
}

const addOrderToOptions = (options: IOption[]): IOrderedOption[] => {
    return options.map((o, idx) => ({ ...o, order: idx }));
};

const insertOptionByOrder = (option: IOrderedOption, options: IOrderedOption[]): IOrderedOption[] => {
    const idx = options.findIndex((o) => o.order > option.order);

    if (idx > -1) {
        return [...options.slice(0, idx), option, ...options.slice(idx)];
    }
    return [...options, option];
};

const removeOptionByIndex = (idx: number, options: IOrderedOption[]): IOrderedOption[] => {
    return [...options.slice(0, idx), ...options.slice(idx + 1)];
};

const MultiSelect: FC<Props> = ({ options, selectedOptions, updateSelectedOptions }) => {
    const [optionsInMenu, updateOptionsInMenu] = useState<IOrderedOption[]>(addOrderToOptions(options));
    const [menuIsOpen, toggleMenu] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [focused, setFocused] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (e: Event) => {
            const target = e.target as Node;

            if (menuIsOpen && ref.current && !ref.current.contains(target)) {
                toggleMenu(false);
            }
        };

        const addNewOptionByEnterPress = (e: KeyboardEvent) => {
            if (e.key === ENTER_KEY_CODE && searchQuery) {
                const newOption: IOrderedOption = {
                    label: searchQuery,
                    value: searchQuery,
                    order: 0,
                };
                updateSelectedOptions([...selectedOptions, newOption]);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', checkIfClickedOutside);
        document.addEventListener('keydown', addNewOptionByEnterPress);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, [menuIsOpen, searchQuery, selectedOptions, updateSelectedOptions]);

    const addSelectedOption = useCallback(
        (value: string) => {
            const idx = optionsInMenu.findIndex((o) => o.value === value);
            const option = optionsInMenu[idx];

            updateOptionsInMenu(removeOptionByIndex(idx, optionsInMenu));
            updateSelectedOptions([...selectedOptions, option]);
            toggleMenu(false);
            setSearchQuery('');
        },
        [optionsInMenu, selectedOptions, updateSelectedOptions]
    );

    const deleteSelectedOption = useCallback(
        (value: string) => {
            const idx = selectedOptions.findIndex((o) => o.value === value);
            const option = selectedOptions[idx];

            updateOptionsInMenu(insertOptionByOrder(option, optionsInMenu));
            updateSelectedOptions(removeOptionByIndex(idx, selectedOptions));
        },
        [optionsInMenu, selectedOptions, updateSelectedOptions]
    );

    const deleteAllSelectedOptions = useCallback(() => {
        updateSelectedOptions([]);
        updateOptionsInMenu(addOrderToOptions(options));
    }, [options, updateSelectedOptions]);

    const renderSelectedOptions = useCallback(
        (options: IOrderedOption[]): JSX.Element => {
            return (
                <SelectedOptionsList>
                    {options.map(({ value, label }) => {
                        return (
                            <SelectedOptionContainer key={value}>
                                <SelectedOption>{label}</SelectedOption>
                                <DeleteButton>
                                    <Icon type="x" action={() => deleteSelectedOption(value)} inline={true} />
                                </DeleteButton>
                            </SelectedOptionContainer>
                        );
                    })}
                </SelectedOptionsList>
            );
        },
        [deleteSelectedOption]
    );

    const renderMenu = useCallback(
        (options: IOrderedOption[]): React.ReactChild => {
            return (
                <Menu>
                    {options.length > 0 ? (
                        options
                            .filter(({ label }) => label.includes(searchQuery))
                            .map(({ value, label }) => {
                                return (
                                    <Option
                                        addSelectedOption={addSelectedOption}
                                        key={value}
                                        value={value}
                                        label={label}
                                    />
                                );
                            })
                    ) : (
                        <DefaultLabel>No options to select</DefaultLabel>
                    )}
                </Menu>
            );
        },
        [searchQuery, addSelectedOption]
    );

    const onSearchQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.currentTarget.value);
    };

    const onFocused = () => {
        toggleMenu(true);
        setFocused(true);
    };

    const defaultLabel =
        selectedOptions.length === 0 && searchQuery === '' ? <DefaultLabel>Search or input your tag</DefaultLabel> : null;

    const deleteAllButton = selectedOptions.length > 0 ? <Icon type="x" action={deleteAllSelectedOptions} /> : null;

    const menu = menuIsOpen ? renderMenu(optionsInMenu) : null;

    return (
        <Container ref={ref}>
            <SelectControl focused={focused}>
                {defaultLabel}
                {renderSelectedOptions(selectedOptions)}
                <StyledInput
                    value={searchQuery}
                    onFocus={onFocused}
                    onBlur={() => setFocused(false)}
                    onChange={onSearchQueryChanged}
                />
                <ControlIcons>
                    {deleteAllButton}
                    <Icon type="chevron-down" action={() => toggleMenu(!menuIsOpen)} />
                </ControlIcons>
            </SelectControl>
            {menu}
        </Container>
    );
};

export default MultiSelect;
