import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Elevation, H1 } from '@blueprintjs/core';

export default class Header extends React.PureComponent {
    render() {
        return (
            <Card elevation={Elevation.TWO} className="card-header">
                <Link to="/">
                    <H1>Chromium Downloads Tool</H1>
                </Link>
            </Card>
        )
    }
}
