//IliaIdakiev Debouncing Code & Throttling Info
import React from 'react';

export default function withForm(Cmp, initialState, schema) {
    return class extends React.Component {
        state = {
            form: initialState,
            errors: undefined
        };

        controlChangeHeaderFactory = name => {
            let id;
            return e => {
                const newValue = e.target.value;
                if (id) { clearTimeout(id); id = null; }
                id = setTimeout(() => {
                    this.setState(({ form }) => {
                        return { form: { ...form, [name]: newValue } };
                    });

                    this.runControlValidation(name)
                        .then(() => {
                            this.setState(({ errors: { [name]: current, ...others } = {} }) =>
                                ({ errors: Object.keys(others).length === 0 ? undefined : others }));
                        })
                        .catch(err => {
                            this.setState(({ errors }) => ({ errors: { ...errors, [name]: err.errors } }));
                        })
                    id = null;
                }, 200);
            };
        };

        getFormState = () => {
            return this.state.form;
        };

        getFormErrorsState = () => {
            return this.state.errors;
        };

        runControlValidation = name => {
            const currentValue = this.state.form[name];
            return schema.fields[name].validate(currentValue, { abortEarly: false });
        }

        runValidations = () => {
            return schema.validate(this.state.form, { abortEarly: false })
                .then(() => {
                    this.setState({ errors: undefined });
                    return this.state.form;
                })
                .catch(err => {
                    const errors = err.inner.reduce((acc, { path, message }) => {
                        acc[path] = (acc[path] || []).concat(message);
                        return acc;
                    }, {});
                    this.setState({ errors });
                });
        }

        render() {
            return <Cmp {...this.props} controlChangeHeaderFactory={this.controlChangeHeaderFactory} getFormState={this.getFormState} runValidations={this.runValidations} getFormErrorsState={this.getFormErrorsState}></Cmp>
        };
    }
}