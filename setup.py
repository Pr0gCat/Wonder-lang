from setuptools import setup
from katana import CLI_APPNAME

setup(
    name='katana',
    version="0.0.1",
    packages=['katana'],
    entry_points={
        'console_scripts': [
            f"{CLI_APPNAME} = katana.cli.__main__:main"
        ]
    }
)