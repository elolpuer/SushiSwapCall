//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;

import "./Interfaces/IUniswapV2Router02.sol";
import "./Interfaces/IUniswapV2Pair.sol";
import "./Interfaces/IUniswapV2ERC20.sol";
import "./Libraries/TransferHelper.sol";

contract SushiswapLiquidityRouter {

  event Deposit(address sender, uint amountA, uint amountB);
  event Withdraw(address sender, uint amountA, uint amountB);

  IUniswapV2Router02 immutable router;
  IUniswapV2Pair immutable pair;
  IUniswapV2ERC20 immutable usdc;
  IUniswapV2ERC20 immutable usdt;
  //usdc polygon 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
  //usdt polygon 0xc2132D05D31c914a87C6611C10748AEb04B58e8F
  //router polygon 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506
  //pair polygon 0x4B1F1e2435A9C96f7330FAea190Ef6A7C8D70001
  //pair rinkeby 0x8edA82BCC2CCb5B82FA8adcAf9d843247b3C1dA6

  mapping(address => uint256) public userBalance;
  uint256 public totalDeposits;

  constructor(
    address _router,
    address _pair,
    address _usdc,
    address _usdt
  ) {
    router = IUniswapV2Router02(_router);
    pair = IUniswapV2Pair(_pair);
    usdc = IUniswapV2ERC20(_usdc);
    usdt = IUniswapV2ERC20(_usdt);
  }

  //usdc/usdt
  function deposit(
    uint amountADesired,
    uint amountBDesired,
    uint amountAMin,
    uint amountBMin
  ) public {
    address sender = msg.sender;
    //deadline ставим в значение 30 минут
    uint256 deadline = block.timestamp + 30 minutes;
    //отправляем токены на адрес нашего контракта
    usdc.transferFrom(sender, address(this), amountADesired);
    usdt.transferFrom(sender, address(this), amountBDesired);
    //даем разрешение на использование токенов контрактом роутера свапа
    usdc.approve(address(router), amountADesired);
    usdt.approve(address(router), amountBDesired);
    //добавляем ликвидность
    (uint amountA, uint amountB, uint liquidity) = router.addLiquidity(
      address(usdc),
      address(usdt),
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      address(this), // ставим адрес получателя наш контракт потому что
                     // мы не хотим чтобы пользователь мог забрать ликвидность напрямую
                     // иначе мы не сможем отследить это
      deadline
    );
    //добавляем LP к пользователю и в общий баланс
    userBalance[sender] += liquidity;
    totalDeposits += liquidity;
    emit Deposit(sender, amountA, amountB);
  }

  event WithdrawTest(uint test);

  function withdraw(
    uint liquidity,
    uint amountAMin,
    uint amountBMin
  ) public {
    address sender = msg.sender;
    //проверяем достаточно ли LP токенов у пользователя
    require(userBalance[sender] >= liquidity, "Not enough liquidity");
    //deadline ставим в значение 30 минут
    uint256 deadline = block.timestamp + 30 minutes;
    //даем разрешение на использование токенов LP контракту роутера
    pair.approve(address(router), 100000000000000000000000000);
    usdc.approve(address(router), 100000000000000000000000000);
    usdt.approve(address(router), 100000000000000000000000000);
    //удаляем ликвидность и забираем токены
    (uint amountA, uint amountB) = router.removeLiquidity(
        address(usdc),
        address(usdt),
        liquidity,
        amountAMin,
        amountBMin,
        sender,
        deadline
    );
    //вычитаем LP у пользователя и в общего баланса
    userBalance[sender] -= liquidity;
    totalDeposits -= liquidity;
    emit Withdraw(sender, amountA, amountB);
  }

}
