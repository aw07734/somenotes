import React from 'react';
import AsyncValidator from 'async-validator';

export default function FormCreate(WrappedComponent) {
    const store = {};
    return class Form extends React.Component {
        getFieldsProps = (fieldKey, options) => {
            return {
                key: fieldKey,
                disabled: options?.disabled ? options.disabled(this.getFieldsValue()) : undefined,
                onInput: e => {
                    const value = e.target.value;
                    store[fieldKey] = store[fieldKey] || {};
                    store[fieldKey].value = value;

                    if (options?.validator) {
                        const validator = new AsyncValidator({[fieldKey]: options.validator});
                        validator.validate({[fieldKey]: value})
                            .then(res => store[fieldKey].errors = null)
                            .catch(({errors}) => store[fieldKey].errors = errors.map(err => err.message).join(','))
                            .then(() => this.forceUpdate());
                    }
                }
            };
        }

        getFieldsValue = () => {
            return Object.keys(store).reduce((prev, current) => {
                return {
                    ...prev,
                    [current]: store[current].value
                };
            }, {});
        }

        getFieldsError = (fieldKey) => {
            return {
                children: store[fieldKey]?.errors
            };
        }

        render() {
            const form = {
                getFieldsProps: this.getFieldsProps,
                getFieldsValue: this.getFieldsValue,
                getFieldsError: this.getFieldsError
            };
            return (<WrappedComponent form={form}/>)
        }
    };
}
