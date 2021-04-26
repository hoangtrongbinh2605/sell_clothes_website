<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        
        <style type="text/css">
        	div.demo {
        		width: 50px;
        		height: 50px;
        		display: inline-block;
        		background: blue;
        	}
        	table {
        		max-width: 100%;
    			background-color: transparent;
        	}
        	thead {
        		    display: table-header-group;
				    vertical-align: middle;
				    border-color: inherit;
        	}
        	tbody {
        			display: table-row-group;
				    vertical-align: middle;
				    border-color: inherit;
        	}
        </style>
    </head>
    <body>
       <div class="demo"></div>
        <table class="table table-condensed">
			<thead>
				<tr class="cart_menu">
					<td class="image">Item</td>
					<td class="description"></td>
					<td class="price">Price</td>
					<td class="quantity">Quantity</td>
					<td class="total">Total</td>
					<td></td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="cart_product">
						<a href=""><img src="images/cart/one.png" alt=""></a>
					</td>
					<td class="cart_description">
						<h4><a href="">Colorblock Scuba</a></h4>
						<p>Web ID: 1089772</p>
					</td>
					<td class="cart_price">
						<p>$59</p>
					</td>
					<td class="cart_quantity">
						<div class="cart_quantity_button">
							<a class="cart_quantity_up" href=""> + </a>
							<input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2">
							<a class="cart_quantity_down" href=""> - </a>
						</div>
					</td>
					<td class="cart_total">
						<p class="cart_total_price">$59</p>
					</td>
					<td class="cart_delete">
						<a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
					</td>
				</tr>

				<tr>
					<td class="cart_product">
						<a href=""><img src="images/cart/two.png" alt=""></a>
					</td>
					<td class="cart_description">
						<h4><a href="">Colorblock Scuba</a></h4>
						<p>Web ID: 1089772</p>
					</td>
					<td class="cart_price">
						<p>$59</p>
					</td>
					<td class="cart_quantity">
						<div class="cart_quantity_button">
							<a class="cart_quantity_up" href=""> + </a>
							<input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2">
							<a class="cart_quantity_down" href=""> - </a>
						</div>
					</td>
					<td class="cart_total">
						<p class="cart_total_price">$59</p>
					</td>
					<td class="cart_delete">
						<a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
					</td>
				</tr>
				<tr>
					<td class="cart_product">
						<a href=""><img src="images/cart/three.png" alt=""></a>
					</td>
					<td class="cart_description">
						<h4><a href="">Colorblock Scuba</a></h4>
						<p>Web ID: 1089772</p>
					</td>
					<td class="cart_price">
						<p>$59</p>
					</td>
					<td class="cart_quantity">
						<div class="cart_quantity_button">
							<a class="cart_quantity_up" href=""> + </a>
							<input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2">
							<a class="cart_quantity_down" href=""> - </a>
						</div>
					</td>
					<td class="cart_total">
						<p class="cart_total_price">$59</p>
					</td>
					<td class="cart_delete">
						<a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
					</td>
				</tr>
				<tr>
					<td colspan="4">&nbsp;</td>
					<td colspan="2">
						<table class="table table-condensed total-result">
							<tr>
								<td>Cart Sub Total</td>
								<td>$59</td>
							</tr>
							<tr>
								<td>Exo Tax</td>
								<td>$2</td>
							</tr>
							<tr class="shipping-cost">
								<td>Shipping Cost</td>
								<td>Free</td>										
							</tr>
							<tr>
								<td>Total</td>
								<td><span>$61</span></td>
							</tr>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
    </body>
</html>