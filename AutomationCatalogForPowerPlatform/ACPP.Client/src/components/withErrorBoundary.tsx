// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState } from 'react';


function withErrorBoundary(WrappedComponent: React.ComponentType<any>) {
    return function ErrorBoundary(props: any) {
        const [error, setError] = useState<string | null>(null);

        if (error) {
            return <div>An error occurred!</div>;
        }

        try {
            return <WrappedComponent {...props} />;
        } catch (err) {
            setError(err as string);
        }

        return null;
    }
}

export default withErrorBoundary;


