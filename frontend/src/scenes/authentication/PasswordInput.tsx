import { Form, Input } from 'antd'
import { FormItemProps } from 'antd/es/form'
import React, { lazy, Suspense } from 'react'

import { ExclamationCircleFilled } from '@ant-design/icons'

const PasswordStrength = lazy(() => import('../../lib/components/PasswordStrength'))

interface PasswordInputProps extends FormItemProps {
    showStrengthIndicator?: boolean
    label?: string
    style?: React.CSSProperties
    validateMinLength?: boolean
    validationDisabled?: boolean
    disabled?: boolean
}

export const PasswordInput = React.forwardRef(function PasswordInputInternal(
    {
        label = 'Password',
        showStrengthIndicator,
        validateMinLength,
        style,
        validationDisabled,
        disabled,
        ...props
    }: PasswordInputProps,
    ref: React.LegacyRef<Input>
): JSX.Element {
    return (
        <div style={{ marginBottom: 24, ...style }}>
            <div style={{ display: 'flex', alignItems: 'center' }} className="ant-form-item-label">
                <label htmlFor="password">{label}</label>
                {showStrengthIndicator && (
                    <Form.Item
                        shouldUpdate={(prevValues, currentValues) => prevValues.password !== currentValues.password}
                        style={{ margin: 0, flexGrow: 1, paddingBottom: 8 }}
                    >
                        {({ getFieldValue }) => (
                            <Suspense fallback={<></>}>
                                <div
                                    style={{
                                        display: 'flex',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        paddingLeft: '60%',
                                    }}
                                >
                                    <PasswordStrength password={getFieldValue('password')} />
                                </div>
                            </Suspense>
                        )}
                    </Form.Item>
                )}
            </div>
            <Form.Item
                name="password"
                rules={
                    !validationDisabled
                        ? [
                              {
                                  required: true,
                                  message: (
                                      <>
                                          <ExclamationCircleFilled style={{ marginRight: 4 }} /> Please enter your
                                          password to continue
                                      </>
                                  ),
                              },
                              {
                                  min: validateMinLength ? 8 : undefined,
                                  message: (
                                      <>
                                          <ExclamationCircleFilled style={{ marginRight: 4 }} /> Password must be at
                                          least 8 characters
                                      </>
                                  ),
                              },
                          ]
                        : undefined
                }
                style={showStrengthIndicator ? { marginBottom: 0 } : undefined}
                {...props}
            >
                <Input
                    ref={ref}
                    className="ph-ignore-input"
                    type="password"
                    data-attr="password"
                    placeholder="••••••••••"
                    disabled={disabled}
                />
            </Form.Item>
        </div>
    )
})
