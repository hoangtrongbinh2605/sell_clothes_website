<?php

namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Mail;
class MailController extends Controller
{
    public function sendMail(Request $request)
    {
    	$getRequest = $request->all();
    	
    	Mail::send('frontend.sendMail.mail', 
    		array(
    			'username'=>$getRequest["name"],
    			'email'=>$getRequest["email"]), 
    		function($message){
	        	$message->to('ut2210197@gmail.com', 'Visitor')
	        			->subject('Visitor Feedback!');
	    });
	    session()->forget('cart');
	    return view('frontend.cart.cart');
    }

    
}
