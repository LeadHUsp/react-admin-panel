import React, { useState } from 'react';
//mui
import {
    Chip,
    makeStyles,
    TextField,
    ListItem,
    List,
    ListItemText,
    Paper,
    Collapse,
    ListItemIcon,
    Checkbox,
    Divider,
    Popover,
    Box,
} from '@material-ui/core';

import { transformMultilevelDepth } from 'helpers/arrayFormating';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    select: {
        padding: '10px',
        border: '1px solid #e6e6e6',
        borderRadius: '5px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    chips: {
        maxWidth: 300,
        display: 'flex',
        flexWrap: 'wrap',
        padding: '20px 0',
    },
    chip: {
        margin: 2,
    },
    container: {
        position: 'relative',
    },
}));
interface DepthSearchSelectPropsInterface {
    [key: string]: any;
    options: any[];
    depthKey: string;
    getOptionLabel: (option: any) => any;
    getOptionValue: (option: any) => any;
    onChange?: (newValue: any) => any;
    value?: any[] | null;
    multiSelect?: boolean;
    actionChipText?: string;
}
export const DepthSearchSelect: React.FC<DepthSearchSelectPropsInterface> = ({
    options,
    depthKey,
    getOptionLabel,
    getOptionValue,
    onChange,
    value,
    multiSelect,
    actionChipText,
}) => {
    const classes = useStyles();
    const anchorEl = React.useRef<HTMLDivElement>(null);
    const [choosedItems, setChoosedItems] = useState<any[]>([]);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [widthInput, setwidthInput] = useState<number | null>(null);
    const [popoverOpen, setpopoverOpen] = useState(false);
    const [activeCollapse, setActiveCollapse] = useState<any[]>([]);
    const [formatedData, setformatedData] = useState<any[]>([]);

    const setOpenCollapse = (value: any) => {
        activeCollapse.includes(value)
            ? setActiveCollapse((prev) => prev.filter((i) => i !== value))
            : setActiveCollapse((prev) => [...prev, value]);
    };
    React.useEffect(() => {
        const newArray = transformMultilevelDepth(options, depthKey);
        setformatedData(newArray);

        //eslint-disable-next-line
    }, []);
    //обработчик изменения поля поиска
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
        const filteredArray = formatedData.filter(
            (i) =>
                getOptionLabel(i).toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
        );
        setformatedData(filteredArray);
    };
    const handleOpenMenu = (e: any) => {
        setpopoverOpen((prev) => !prev);
        anchorEl.current && setwidthInput(anchorEl.current.offsetWidth);
    };
    const handleClose = () => {
        setpopoverOpen(false);
    };
    //проверка находится ли текущий элемент в списке выбранных
    const checkItemContainsInArray = (item: any): boolean => {
        if (onChange) {
            if (value) {
                return value.some((i: any) => getOptionValue(i) === item);
            } else {
                return false;
            }
        } else {
            return choosedItems.some((i: any) => getOptionValue(i) === item);
        }
    };
    //удавляем опцию из массива выбранных элементов
    const removeOptionFromArray = (option: any) => {
        let newValue;
        if (onChange) {
            if (value) {
                newValue = value.filter(
                    (i: any) => getOptionValue(i) !== getOptionValue(option)
                );
                onChange(newValue);
            }
        } else {
            newValue = choosedItems.filter(
                (i) => getOptionValue(i) !== getOptionValue(option)
            );
            setChoosedItems(newValue);
        }
    };
    const addOptionToArray = (option: any) => {
        let newValue;
        if (onChange) {
            if (value) {
                newValue = multiSelect ? [...value, option] : [option];
                onChange(newValue);
            }
        } else {
            newValue = multiSelect ? [...choosedItems, option] : [option];
            setChoosedItems(newValue);
        }
    };
    const handleCheckBoxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        option: any
    ) => {
        const element = e.target;
        if (!element.checked) {
            removeOptionFromArray(option);
        } else {
            addOptionToArray(option);
        }
    };
    const hadnleDeleteChip = (item: any) => {
        removeOptionFromArray(item);
    };
    let level = 1;
    const renderListItemWithDepth = (array: any) => {
        return (
            <>
                {array.map((item: any) => {
                    level = 1;
                    return item[depthKey].length > 0 ? (
                        <React.Fragment key={getOptionValue(item)}>
                            <ListItem
                                button
                                onClick={() => {
                                    setOpenCollapse(item._id);
                                }}>
                                <ListItemIcon style={{ minWidth: 'auto' }}>
                                    <Checkbox
                                        disableRipple
                                        edge="start"
                                        style={{ padding: '5px' }}
                                        tabIndex={-1}
                                        checked={checkItemContainsInArray(
                                            getOptionValue(item)
                                        )}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        onChange={(e) => {
                                            handleCheckBoxChange(e, item);
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={getOptionLabel(item)} />
                                {activeCollapse.includes(getOptionValue(item)) ? (
                                    <ExpandLess />
                                ) : (
                                    <ExpandMore />
                                )}
                            </ListItem>
                            <Divider />
                            <Collapse
                                in={activeCollapse.includes(getOptionValue(item))}
                                timeout="auto">
                                <List
                                    component="div"
                                    disablePadding
                                    style={{ paddingLeft: `${level * 10}px` }}>
                                    {renderListItemWithDepth(item[depthKey])}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ) : (
                        <ListItem button key={getOptionValue(item)}>
                            <ListItemIcon style={{ minWidth: 'auto' }}>
                                <Checkbox
                                    checked={checkItemContainsInArray(
                                        getOptionValue(item)
                                    )}
                                    onChange={(e) => {
                                        handleCheckBoxChange(e, item);
                                    }}
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={getOptionLabel(item)} />
                        </ListItem>
                    );
                })}
            </>
        );
    };
    const renderFlatCategoryList = (array: any) => {
        return (
            <List>
                {array.map((item: any) => (
                    <ListItem button key={getOptionValue(item)}>
                        <ListItemIcon style={{ minWidth: 'auto' }}>
                            <Checkbox
                                checked={checkItemContainsInArray(getOptionValue(item))}
                                onChange={(e) => {
                                    handleCheckBoxChange(e, item);
                                }}
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={getOptionLabel(item)} />
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <div ref={anchorEl} className={classes.select}>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                {value && onChange && value.length > 0
                    ? value.map((item: any) => (
                          <Chip
                              key={getOptionValue(item)}
                              label={getOptionLabel(item)}
                              className={classes.chip}
                              onDelete={() => {
                                  hadnleDeleteChip(item);
                              }}
                          />
                      ))
                    : choosedItems.map((item) => (
                          <Chip
                              key={getOptionValue(item)}
                              label={getOptionLabel(item)}
                              className={classes.chip}
                              onDelete={() => {
                                  hadnleDeleteChip(item);
                              }}
                          />
                      ))}
                <Chip
                    label={actionChipText || 'Выбрать опции'}
                    color="primary"
                    className={classes.chip}
                    onClick={handleOpenMenu}
                />
            </div>

            <Popover
                open={popoverOpen}
                anchorEl={anchorEl.current}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                <Box
                    style={{
                        width: widthInput || '',
                        maxHeight: 420,
                        overflowY: 'auto',
                    }}>
                    <Paper>
                        <Box style={{ padding: '20px 10px 0' }}>
                            <TextField
                                style={{ width: '100%' }}
                                label="Поиск"
                                variant="outlined"
                                onChange={handleInputChange}
                                value={searchInputValue}
                            />
                        </Box>
                        {searchInputValue !== '' ? (
                            renderFlatCategoryList(formatedData)
                        ) : (
                            <List>{renderListItemWithDepth(options)}</List>
                        )}
                    </Paper>
                </Box>
            </Popover>
        </div>
    );
};
