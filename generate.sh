#!/bin/bash
nest g res $1
cd ./src/$1
mkdir controllers services test
mv *.controller.ts controllers
mv *.service.ts services
mv *.spec.ts test