import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';

import {CustomersService} from '../service/customers.service';
import {Customer} from '../schema/customer.schema';
import {RegisterRequest} from '../../../shared/models/requests.model';

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
        return this._customersService.findCustomerById(id);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createNewCustomer(@Body() registerRequest: RegisterRequest): Promise<Customer> {
        return this._customersService.createCustomerFromRequest(registerRequest);
    }
}
