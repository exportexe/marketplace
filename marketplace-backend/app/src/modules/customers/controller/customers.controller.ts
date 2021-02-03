import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';

import {CustomersService} from '../service/customers.service';
import {Customer} from '../schema/customer.schema';
import {CreateCustomerDto} from '../dto/create-customer.dto';

@Controller('api/customerManagement')
export class CustomersController {

    constructor(private _customersService: CustomersService) {
    }

    @Get('all')
    @HttpCode(HttpStatus.ACCEPTED)
    async getAllCustomers(): Promise<Customer[] | null> {
        return this._customersService.getAllCustomers();
    }

    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async getCustomerById(@Param('id') id: string): Promise<Customer | null> {
        return this._customersService.getCustomerById(id);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createNewCustomer(@Body() customerDto: CreateCustomerDto): Promise<Customer> {
        return this._customersService.createNewCustomer(customerDto);
    }
}
