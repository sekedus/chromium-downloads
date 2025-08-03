import React from 'react';
import { Card } from '@blueprintjs/core';

export default class Footer extends React.PureComponent {
    render() {
        return (
            <Card className="card-footer">
                Got an issue? Post it on the <a href="https://github.com/sekedus/chromium-downloads" target="_blank" rel="noopener noreferrer">GitHub repo</a>!<br/>
                The Chromium™ open source project is a registered trademark of Google LLC. All rights reserved.
            </Card>
        )
    }
}
