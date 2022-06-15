//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;

import "./Interfaces/IUniswapV2Router02.sol";
import "./Interfaces/IUniswapV2Pair.sol";

contract SushiswapLiquidityRouter {

  event Deposit(address sender, uint amountA, uint amountB);
  event Withdraw(address sender, uint amountA, uint amountB);

  IUniswapV2Router02 immutable router;
  IUniswapV2Pair immutable pair;
  address immutable usdc;
  address immutable usdt;
  //usdt polygon 0xc2132D05D31c914a87C6611C10748AEb04B58e8F
  //usdc polygon 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
  //router polygon 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506
  //pair polygon 0x4B1F1e2435A9C96f7330FAea190Ef6A7C8D70001
  //pair rinkeby 0x8edA82BCC2CCb5B82FA8adcAf9d843247b3C1dA6

  constructor(
    address _router,
    address _pair,
    address _usdc,
    address _usdt
  ) {
    router = IUniswapV2Router02(_router);
    pair = IUniswapV2Pair(_pair);
    usdc = _usdc;
    usdt = _usdt;
  }

  //usdc/usdt
  function deposit(
    uint amountADesired,
    uint amountBDesired,
    uint amountAMin,
    uint amountBMin
  ) public {
    uint256 deadline = block.timestamp + 30 minutes;
    // (bool success, bytes memory result) = address(router).delegatecall(
    //   abi.encodeWithSignature(
    //     "addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)",
    //     usdc,usdt,amountADesired,amountBDesired,amountAMin,amountBMin,msg.sender,deadline
    //   )
    // );
    // require(success, "Not success");
    // (uint amountA, uint amountB, uint liquidity) = abi.decode(result, (uint,uint,uint));
    // emit Deposit(msg.sender, amountA, amountB);


    // (uint amountA, uint amountB, uint liquidity) = router.addLiquidity(
    //   usdc,
    //   usdt,
    //   amountADesired,
    //   amountBDesired,
    //   amountAMin,
    //   amountBMin,
    //   msg.sender,
    //   deadline
    // );
    uint256 amountA = amountADesired;
    uint256 amountB = amountBDesired;
    emit Deposit(msg.sender, amountA, amountB);
  }

  function withdraw(
    uint liquidity,
    uint amountAMin,
    uint amountBMin
  ) public {
    uint256 deadline = block.timestamp + 30 minutes;
    // (bool success, bytes memory result) = address(router).delegatecall(
    //   abi.encodeWithSignature(
    //     "removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)",
    //     usdc, usdt, liquidity, amountAMin, amountBMin, msg.sender, deadline
    //   )
    // );
    // require(success, "Not success");
    // (uint amountA, uint amountB) = abi.decode(result, (uint,uint));
    // emit Withdraw(msg.sender, amountA, amountB);


    // (uint amountA, uint amountB) = router.removeLiquidity(
    //     usdc,
    //     usdt,
    //     liquidity,
    //     amountAMin,
    //     amountBMin,
    //     msg.sender,
    //     deadline
    // );
    uint256 amountA = amountAMin;
    uint256 amountB = amountBMin;
    emit Withdraw(msg.sender, amountA, amountB);
  }

  function userBalance(address user) public view returns(uint256){
    return pair.balanceOf(user);
  }

  function totalDeposits() public view returns(uint256){
    return pair.totalSupply();
  }

}
