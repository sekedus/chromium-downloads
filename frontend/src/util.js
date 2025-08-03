const filesize = require('file-size')

export const getHumanReadableSize = (size) => {
    return filesize(parseInt(size)).human('si')
}

export const channelInfo = {
    'extended': {
        color: 'primary'
    },
    'stable': {
        color: 'success'
    },
    'beta': {
        color: 'warning'
    },
    'dev': {
        color: 'danger'
    },
    'canary': {},
    'canary_asan': {}
}

export const channelKeys = Object.keys(channelInfo)

export var osInfo = {
    'win64': {
        name: 'Windows (x64)',
        baseDir: 'Win_x64',
        files: [
            {
                name: 'Installer',
                filename: 'mini_installer.exe'
            },
            {
                name: 'Archive',
                filename: 'chrome-win.zip'
            },
            {
                name: 'Archive',
                filename: 'chrome-win32.zip'
            }
        ]
    },
    'win_arm64': {
        name: 'Windows (ARM64)',
        baseDir: 'Win_Arm64'
    },
    'win': {
        name: 'Windows (x86)',
        baseDir: 'Win'
    },
    'mac': {
        name: 'macOS',
        baseDir: 'Mac',
        files: [
            {
                name: 'Archive',
                filename: 'chrome-mac.zip'
            }
        ]
    },
    'mac_arm64': {
        name: 'macOS (ARM64)',
        baseDir: 'Mac_Arm'
    },
    'linux': {
        name: 'Linux',
        baseDir: 'Linux_x64',
        files: [
            {
                name: 'Archive',
                filename: 'chrome-linux.zip'
            }
        ]
    }
}

osInfo.win.files = osInfo.win64.files
osInfo.win_arm64.files = osInfo.win64.files
osInfo.mac_arm64.files = osInfo.mac.files

export const osKeys = Object.keys(osInfo)
