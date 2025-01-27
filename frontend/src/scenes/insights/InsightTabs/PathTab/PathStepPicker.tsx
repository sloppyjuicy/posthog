import React from 'react'
import { useActions, useValues } from 'kea'
import { Select } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import { ANTD_TOOLTIP_PLACEMENTS } from 'lib/utils'
import { pathsLogic } from 'scenes/paths/pathsLogic'
import { DEFAULT_STEP_LIMIT } from 'scenes/paths/pathsLogic'
import { insightLogic } from 'scenes/insights/insightLogic'

interface StepOption {
    label: string
    value: number
}

const MIN = 2,
    MAX = 20

const options: StepOption[] = Array.from(Array.from(Array.from(Array(MAX + 1).keys()).slice(MIN)), (v) => ({
    label: `${v} Steps`,
    value: v,
}))

export function PathStepPicker(): JSX.Element {
    const { insightProps } = useValues(insightLogic)
    const { filter } = useValues(pathsLogic(insightProps))
    const { setFilter } = useActions(pathsLogic(insightProps))

    return (
        <Select
            id="path-step-filter"
            data-attr="path-step-filter"
            defaultValue={5}
            value={filter.step_limit || DEFAULT_STEP_LIMIT}
            onSelect={(count) => setFilter({ step_limit: count })}
            listHeight={440}
            bordered={false}
            dropdownMatchSelectWidth={true}
            dropdownAlign={ANTD_TOOLTIP_PLACEMENTS.bottomRight}
            optionLabelProp="label"
        >
            {options.map((option) => {
                return (
                    <Select.Option
                        key={option.value}
                        value={option.value}
                        label={
                            <>
                                <BarsOutlined /> {option.label}
                            </>
                        }
                    >
                        {option.label}
                    </Select.Option>
                )
            })}
        </Select>
    )
}
